const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'Please provide basic authentication credentials'
        })
    }

    // Decode base64 credentials
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    // Check if username and password are valid (contoh)
    const validUsers = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
    ]
    const user = validUsers.find(u => u.username === username && u.password === password)

    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Invalid credentials',
            message: 'Username or password is incorrect'
        })
    }

    req.user = {
        username: user.username,
        role: user.role
    }

    next()
}

const requireRole = (roles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required',
            })
        }

        // Check if user has required role
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                success: false,
                error: 'Forbidden',
                message: `Required role: ${roles.join('or')}`
            })
        }
        next()
    }
}

module.exports = {
    basicAuth,
    requireRole
}

// validasi format email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// validasi format password
const isValidPassword = (password) => {
    if (password.length < 8) return false; // jika password bukan 8 karakter
    if (!/[a-zA-Z]/.test(password)) return false; // jika password tidak berisi huruf
    if (!/[0-9]/.test(password)) return false; // jika password tidak berisi angka
    return true; // jika password valid
};

// validasi username
const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username); // jika username valid
};

// validasi phone number
const isValidPhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber); // jika phone number valid
};

// validasi harus di isi
const validateRequired = (field, data) => {
    const missing = []
    field.forEach((field) => {
        if (!data[field] || data[field].toString().trim() === '') {
            missing.push(field)
        }
    })
    return missing
};

// validasi register
const validateRegister = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body
    const errors = []

    // field harus di isi
    const missing = validateRequired(['username', 'email', 'password', 'confirmPassword'], req.body)

    // jika ada field yang tidak di isi
    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Field ${missing.join(',')} harus di isi`,
        })
    }

    // jika username tidak valid
    if (!isValidUsername(username)) {
        errors.push('Username harus 3 - 20 karakter dan hanya huruf,angka dan underscore')
    }

    // jika email tidak valid
    if (!isValidEmail(email)) {
        errors.push('Email tidak valid')
    }

    // jika password dan confirmPassword tidak valid
    if (password !== confirmPassword) {
        errors.push('Password dan confirmPassword tidak sama')
    }

    // jika ada error dari atas tampilkan error
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    next()


}

// validasi login
const validateLogin = (req, res, next) => {
    const { username, password } = req.body
    const errors = []

    // field harus di isi
    const missing = validateRequired(['username', 'password'], req.body)

    // jika ada field yang tidak di isi
    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Field ${missing.join(',')} harus di isi`,
        })
    }

    // jika username tidak valid
    if (!isValidUsername(username)) {
        errors.push('Username tidak valid')
    }

    // jika email tidak valid
    // if (!isValidEmail(email)) {
    //     errors.push('Email tidak valid')
    // }

    // jika password dan confirmPassword tidak valid
    if (password.length < 6) {
        errors.push('Password minimal 6 karakter')
    }

    // jika ada error dari atas tampilkan error
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    next()


}

// validasi email
const validateEmail = (req, res, next) => {
    const { email } = req.body
    const errors = []

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email harus di isi',
        })
    }

    // jika email tidak valid
    if (!isValidEmail(email)) {
        errors.push('Format email tidak valid')
    }

    next()
}

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidPhone,
    isValidUsername,
    validateRegister,
    validateLogin,
    validateEmail,
}

const escapeHTML = (str) => {
    if (typeof str !== 'string') return str;

    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


const removeScriptTags = (str) => {
    if (typeof str !== 'string') return str;

    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};


const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;

    let sanitized = str.trim();
    sanitized = removeScriptTags(sanitized);
    sanitized = escapeHTML(sanitized);

    return sanitized;
};


const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }

    const sanitized = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            sanitized[key] = sanitizeObject(obj[key]);
        }
    }

    return sanitized;
};


const sanitizeBody = (req, res, next) => {
    req.body = sanitizeObject(req.body);
    next();
};


const sanitizeFields = (fields) => {
    return (req, res, next) => {
        fields.forEach(field => {
            if (req.body[field]) {
                req.body[field] = sanitizeString(req.body[field]);
            }
        });
        next();
    };
};


const sanitizeForSQL = (str) => {
    if (typeof str !== 'string') return str;


    return str
        .replace(/'/g, "''")
        .replace(/;/g, '')
        .replace(/--/g, '')
        .replace(/\/\*/g, '')
        .replace(/\*\//g, '');
};

// Strip tags (keep only text)
const stripTags = (str) => {
    if (typeof str !== 'string') return str;

    return str.replace(/(<([^>]+)>)/ig, '');
};

module.exports = {
    escapeHTML,
    removeScriptTags,
    sanitizeString,
    sanitizeObject,
    sanitizeBody,
    sanitizeFields,
    sanitizeForSQL,
    stripTags
};
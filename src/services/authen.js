export function accountLogin(params) {
    const response = params.payload;
    if (response.username === 'tony' && response.password === '1234') {
        return {
            status: 200,
            role: 'ADMIN'
        }
    } else if (response.username === 'tamnxl' && response.password === '1234') {
        return {
            status: 200,
            role: 'USER'
        }
    } else {
        return {
            status: 401,
            role: ''
        }
    }
}
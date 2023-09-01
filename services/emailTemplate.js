module.exports = ({otp}) => {
    return `
        <!doctype html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Optask</title>
               
            </head>
            <body>
                <h4> OTP is ${otp}</h4>
            </body>
        </html>
    `;
}
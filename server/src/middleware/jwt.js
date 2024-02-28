const jwt = require('jsonwebtoken');   //jwt token
// const sharp = require('sharp');
// const fs = require('fs');

function generateJWTToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = decoded;
        next();
    });
}
// function uploadAndCompressImage(req,res){
//     sharp('input.jpg')
//     .resize(200) // Resize image to width of 200px
//     .toFile('output_compressed.jpg', (err, info) => {
//       if (err) {
//         console.error(err);
//       }
//       decompressImage();
//     });
// function decompressImage(){
//     sharp('output_compressed.jpg')
//   .toFile('output_decompressed.jpg', (err, info) => {
//     if (err) {
//         console.error('Error decompressing image:', err);
//     }
//     console.log('Image compression and decompression done successfully');
//   });
// }

// }


module.exports = {verifyToken,generateJWTToken};




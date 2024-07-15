import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import './style.css';

const QRCodeGenerator = () => {

    const [text, setText] = useState('');
    const qrRef = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;

        a.download = 'QRCode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleShare = async () => {
        const canvas = qrRef.current.querySelector('canvas');
        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });
            try {
                await navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR code!',
                    files: [file],
                });
            } catch (error) {
                console.error('Error sharing QR code:', error);
            }
        });
    };

    return (
        <>
            <div className='heading'>
                <h1>QR Code Generator</h1>
            </div>
            <div className='qr-generator'>
                <div>
                    <input type='text' value={text} onChange={handleChange} placeholder='Enter text or URL' />
                </div>
                <div ref={qrRef} style={{ marginTop: '20px' }}>
                    <QRCode value={text} className='qr_code'/>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleDownload}>Download QR Code</button>
                    <button onClick={handleShare}>Share QR Code</button>
                </div>
            </div>
        </>
    )
}

export default QRCodeGenerator;
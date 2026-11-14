const crypto = require('crypto');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { req_time, tran_id, amount, items } = JSON.parse(event.body);
        
        const merchant_id = "ec480530";
        const api_key = "FDCB5F572548AF9C2C08FEE4949D8C5A04842620"; // API Key លាក់ទុកទីនេះដោយសុវត្ថិភាព

        // បង្កើត Hash string តាមលំដាប់ ABA
        const hash_string = req_time + merchant_id + tran_id + amount + items;
        
        // គណនា HMAC SHA512
        const hash = crypto.createHmac('sha512', api_key)
                           .update(hash_string)
                           .digest('base64');

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hash: hash })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

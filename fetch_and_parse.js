const http = require('http');

http.get('http://localhost:3000/products', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    
    // Check if the names are rendered as text in headings or card links
    // e.g. looking for the product name surrounded by HTML tags, not in a JSON string
    const products = [
      'AeroLux Premium Capsule Lift',
      'Quantum Gearless Passenger Lift'
    ];
    
    products.forEach(p => {
      // Find occurrences of the product name
      let idx = 0;
      while (true) {
        idx = data.indexOf(p, idx);
        if (idx === -1) break;
        // Print 50 chars before and after the occurrence
        const snippet = data.substring(Math.max(0, idx - 80), Math.min(data.length, idx + p.length + 80));
        console.log(`\nOccurrence of "${p}":`);
        console.log(snippet);
        idx += p.length;
      }
    });
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
});

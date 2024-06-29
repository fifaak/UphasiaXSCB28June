fetch('http://127.0.0.1:8000/guess_word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "occupation": "ทหาร",
      "num_of_word": 2,
      "word": ""
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
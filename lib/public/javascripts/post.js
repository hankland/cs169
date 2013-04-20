function post(url, data, on_success) {
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: on_success,
    error: function on_error(err) {alert(JSON.stringify(err));}
  });
}


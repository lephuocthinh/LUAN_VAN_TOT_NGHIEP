const util = (data) => {
  return (
    data.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
  )
}

export default util;

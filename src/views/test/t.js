// import selfPro from './selfPro'
const f = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa')
  }, 2000)

})
console.log(f)
f.then(res => {
  console.log(res);

})

//promise.all ([p1,p2]) 用于将多个promise实例包装成一个promise实例

//promise.all([]) 返回promise实例

//传一个数组当参数

//数组里的可以是promise实例，也可以是别的值（如原始值),数组里的值只有promise 实例会等待状态的改变

// 当所有的promise实例都完成,该promise才算完成，返回值是一个数组，数组中的值是所有子promise返回的值 resolve('value') --> 传递才来的值,
// 要死不是promise实例，则直接返回

//有任何一个子promise失败的话，该promise失败，返回值是第一个失败的子promise实例传递出来的结果。


console.log('here we go');

Promise.all([1, 2, 3, 4])
    .then(all => {
        console.log('1:' + all);
        return Promise.all([function() {
            console.log('000.')
        }, 'one', 'tow']);
    })
    .then(all => {
        console.log(typeof all + '类型')
        console.log('2:' + all[0]);
        let p1 = new Promise(resolve => {
            setTimeout(() => {
                resolve('p1');
            }, 1000);
        })
        let p2 = new Promise(resolve => {
            setTimeout(() => {
                resolve('p2');
            });
        })

        return Promise.all([p1, p2]);
    })
    .then(all => {
        console.log('3：' + all);
        let p1 = new Promise(resolve => {
            setTimeout(() => {
                resolve('p1');
            }, 1000);
        })
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('fail');
            }, 1500);
        })

        // return 's'
        return Promise.all([p1, p2]);
    })
    .then(all => {
        console.log(all);
    })
    .catch(all => {
        console.log('catch' + all);
    })
const Client = require('ssh2-sftp-client');
const path = require('path');
const readline = require('readline');
const client = new Client();
const localPath = path.resolve(__dirname, '../dist');

(async () => {
    const host = "47.108.147.37";
    const port = "22";
    const username = "root";
    const remotePath = "/www/wwwroot/web/vite_react_mobx_threebase";

    //输入密码
    const password = await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('请输入服务器密码:', (password) => {
            resolve(password);
            rl.close();
        });
    });

    if (await client.connect({ host, port, username, password }).catch(() => false)) {

        if (await client.exists(remotePath)) {
            await client.rmdir(remotePath, true);
            console.log('删除成功');
        }
        console.log(localPath, '上传中');
        if (await client.uploadDir(localPath, remotePath).catch(() => false)) {
            console.log('上传成功');
        } else {
            console.log('上传失败');
        }

    } else {
        console.log('密码错误');
    }

    client.end();
})();
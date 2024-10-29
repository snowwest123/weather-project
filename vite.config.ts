import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import { fileURLToPath, URL } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import dayjs from "dayjs";
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default async ({ mode }) => {

    const isDev = (mode === "development");
    const isProd = (mode === "production");

    const nowDate = dayjs().format("YYYY-MM-DD hh:mm:ss");

    const clothName = await new Promise<string>((resolve, reject) => { resolve("polo衫") });

    return ({
        base: "./",
        // 全局替换
        define: {
            "process.env.BUILD_TIME": `'${nowDate}'`,
        },

        build: {
            assetsInlineLimit: 0,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: false,
                    drop_debugger: true,
                }
            },
            chunkSizeWarningLimit: 1024 * 100,
        },
        plugins: [
            react(),
            vitePluginImp({
                optimize: true,
                libList: [
                    {
                        libName: 'antd',
                        libDirectory: 'es',
                        style: (name) => `antd/es/${name}/style`
                    },
                    {
                        libName: 'antd-mobile',
                        style: () => false,
                        libDirectory: 'es/components',
                        replaceOldImport: true
                    }
                ]
            }),
            isProd && VitePWA({
                scope: "/vite_react_mobx_threebase/",
                mode,
                minify: false,
                registerType: 'autoUpdate',
                workbox: {
                    // 自定义前端缓存的文件
                    globPatterns: ["**\/*.{js,css,html,png,jpg,jpeg,gif,ico,svg,wasm,glb,gltf,fbx,pdf,mp3,mp4,ttf,zip}"],
                    maximumFileSizeToCacheInBytes: 1024 * 1024 * 50, // 最大50MB
                }
            }),
            !isDev && createHtmlPlugin({
                minify: false,
                template: './index.html',
                inject: {
                    data: {
                        title: 'vite_react_mobx_threebase'
                    },
                    tags: [
                        {
                            injectTo: 'body-prepend',
                            tag: 'div',
                            attrs: {
                                id: 'tag',
                                style: "position: fixed;left: 100%;top: 100%;"
                            },
                            children: [
                                {
                                    tag: "h1",
                                    children: clothName
                                }
                            ]
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                "@hashHistory": fileURLToPath(new URL('./src/hashHistory', import.meta.url)),
                "@utils": fileURLToPath(new URL('./src/utils/utils.ts', import.meta.url)),
                "@views": fileURLToPath(new URL('./src/views', import.meta.url)),
                "@globalStore": fileURLToPath(new URL('./src/globalStore.ts', import.meta.url)),
                "@components": fileURLToPath(new URL('./src/components', import.meta.url)),
                "@api": fileURLToPath(new URL('./src/api', import.meta.url)),
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,// 支持内联 javascript
                },
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:9001',
                    changeOrigin: true
                },
            }
        }
    })

}

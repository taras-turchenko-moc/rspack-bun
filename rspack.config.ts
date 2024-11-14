import { defineConfig } from "@rspack/cli";
import { HtmlRspackPlugin, LightningCssMinimizerRspackPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import { VueLoaderPlugin } from 'vue-loader';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	entry: {
		main: "./src/index.ts"
	},
	resolve: {
		extensions: ["...", ".ts"]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    experimentalInlineMatchResource: true
                }
            },
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript"
								}
							},
							env: { targets }
						}
					}
				]
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
        new HtmlRspackPlugin({ template: "./index.html" }),
        new VueLoaderPlugin(),
    ],
	optimization: {
		minimizer: [
			new SwcJsMinimizerRspackPlugin(),
			new LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		css: true
	}
});

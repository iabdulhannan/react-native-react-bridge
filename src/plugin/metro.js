import Metro from "metro";

const babelTransformerPath = require.resolve("./transformer");
const codeExts = ["js", "ts", "jsx", "tsx"];
const htmlExts = ["htm", "html", "css"];
const imageExts = ["bmp", "gif", "png", "jpg", "jpeg", "webp", "svg"];
const sourceExts = [...codeExts, ...htmlExts, ...imageExts];

export const bundle = async (filename) => {
  const config = await Metro.loadConfig();
  config.resolver.sourceExts = sourceExts;
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => !sourceExts.includes(ext)
  );
  config.transformer.babelTransformerPath = babelTransformerPath;

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "web",
    minify: true,
  });
  return code;
};

import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import { AssetPack } from "@assetpack/core";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { pixiPipes } from "@assetpack/core/pixi";

function assetPackPlugin(): Plugin {
    const packConfig = {
        entry: "./assets",
        pipes: [...pixiPipes({})],
        output: "",
    };

    let mode: ResolvedConfig["mode"];
    let ap: AssetPack | undefined;

    return {
        name: "vite-plugin-assetpack",
        configResolved(resolvedConfig) {
            mode = resolvedConfig.command;
            if (!resolvedConfig.publicDir) return;
            if (packConfig.output !== "") return;
            console.log(resolvedConfig.publicDir);
            packConfig.output = `${resolvedConfig.publicDir}/assets/`;
        },
        buildStart: async () => {
            if (mode === "serve") {
                if (ap) return;
                ap = new AssetPack(packConfig);
                void ap.watch();
            } else {
                await new AssetPack(packConfig).run();
            }
        },
        buildEnd: async () => {
            if (ap) {
                await ap.stop();
                ap = undefined;
            }
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), assetPackPlugin()],
});

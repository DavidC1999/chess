import { ImageId } from "./generated/ImageId"
import { IMAGE_DATA } from "./generated/ImageData"

export default class AssetRepository {
    private static images: { [key: number]: HTMLImageElement } = null;

    public static onReady: () => void;

    private static loadCounter = 0;

    public static init() {
        AssetRepository.images = {};

        for (let i = 0; i < ImageId.COUNT; ++i) {
            AssetRepository.images[i] = new Image();
            AssetRepository.images[i].onload = () => {
                ++AssetRepository.loadCounter;
                if (AssetRepository.loadCounter >= ImageId.COUNT && AssetRepository.onReady) AssetRepository.onReady();
            };
            AssetRepository.images[i].src = IMAGE_DATA[i];
        }
    }

    public static getImage(imageId: ImageId): HTMLImageElement {
        if (AssetRepository.images == null) return null;

        return AssetRepository.images[imageId];
    }
}
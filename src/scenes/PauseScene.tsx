import type { Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";

type Props = {
	visible?: boolean;
	coordinator: Dispatch<SceneAction>;
};

export default function PauseScene({ visible, coordinator }: Props) {
	return (
		<pixiContainer visible={visible}>
			<pixiText text="aboba" style={{ fontSize: 36, fill: 0xff0000 }} />
		</pixiContainer>
	);
}

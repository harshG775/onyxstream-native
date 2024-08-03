import BottomSheet from "@gorhom/bottom-sheet";
import { PropsWithChildren, useMemo } from "react";
type ThemeProps = PropsWithChildren & {
    index?: number;
};

export default function BottomSheetDrawer(props: ThemeProps) {
    const { index = 0, children } = props;
    const snapPoints = useMemo(() => ["12%", "50%", "98%"], []);
    return (
        <BottomSheet
            snapPoints={snapPoints}
            index={index}
            backgroundStyle={{ backgroundColor: "#111" }}
            handleIndicatorStyle={{ backgroundColor: "#eee" }}
        >
            {children}
        </BottomSheet>
    );
}

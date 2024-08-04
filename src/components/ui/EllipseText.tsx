import { PropsWithChildren, useState } from "react";
import { Text, View } from "./Themed";
import { fontSize } from "@/constants/styles.constants";

type EllipseTextProps = PropsWithChildren & {
    numberOfLines: number;
    title: string;
};
export function EllipseText({
    children,
    numberOfLines,
    title,
}: EllipseTextProps) {
    const [ellipse, setEllipse] = useState(true);
    return (
        <View>
            <View
                style={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        ...fontSize._Xl,
                    }}
                >
                    {title}
                </Text>
                <Text
                    onPress={() => setEllipse((pre) => !pre)}
                    style={{
                        fontWeight: "bold",
                        fontStyle: "italic",
                    }}
                >
                    {ellipse ? "more" : "less"}
                </Text>
            </View>
            {ellipse ? (
                <Text numberOfLines={numberOfLines} selectable={true}>
                    {children}
                </Text>
            ) : (
                <Text selectable={true}>{children}</Text>
            )}
        </View>
    );
}

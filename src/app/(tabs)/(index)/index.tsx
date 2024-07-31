import { getTopAiring } from "@/services/gogoanime/api";
import { defaultStyles } from "@/styles";
import { useEffect } from "react";
import { Text, ScrollView } from "react-native";
export default function HomeScreen() {
    useEffect(() => {
        const fetchMe = async () => {
            const resp = await getTopAiring(1);
            console.log(resp);
        };
        fetchMe();
    }, []);
    return (
        <ScrollView style={{ ...defaultStyles.container }}>
            <Text style={defaultStyles.text}>STart Screen</Text>
            <Text style={defaultStyles.text}>STart Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>Home Screen</Text>
            <Text style={defaultStyles.text}>End Screen</Text>
        </ScrollView>
    );
}

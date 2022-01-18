import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

type TodoList = {
  [Date: string]: {
    text: string;
    working: boolean;
  };
};

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<TodoList>({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const saveToDos = async (toSave: TodoList) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const loadedItem = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(loadedItem);
  };

  const deleteToDo = async (key: string) => {
    Alert.alert("진짜 삭제할거야?", "후회 안해?>", [
      { text: "calcel" },
      {
        text: "sure",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    setToDos({ ...toDos, [Date.now()]: { text, working } });
    await saveToDos({ ...toDos, [Date.now()]: { text, working } });
    setText("");
  };

  const onChangeText = (e: string) => {
    setText(e);
  };

  // @ts-ignore
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Pressable onPress={work}>
          <Text style={styles.btnText}>Work</Text>
        </Pressable>
        <Pressable onPress={travel}>
          <Text style={styles.btnText}>Travel</Text>
        </Pressable>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        style={styles.input}
        returnKeyType={"done"}
        placeholder={working ? "add to do" : "where do you want to go"}
        onChangeText={(e) => onChangeText(e)}
        value={text}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <Pressable
                onPress={() => {
                  deleteToDo(key);
                }}
              >
                <Text>❌</Text>
              </Pressable>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

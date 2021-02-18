import React, { useCallback, useState, useEffect } from 'react'
import { Modal, View, Text, StatusBar, TextInput, AsyncStorage, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./src/TaskList/Index";
import * as Animatable from 'react-native-animatable'

const Animatablebtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default () => {


  const [task, setTask] = useState([{ id: 1, task: 'a' }])

  const [modal, setModal] = useState(false)
  const [input, setInput] = useState('')



  useEffect(() => {
    const taskStorage = async () => {
      const tarefas = await AsyncStorage.getItem('@task')
      if (tarefas) {
        setTask(JSON.parse(tarefas))
      }
    }
    taskStorage()
  }, [])


  useEffect(() => {
    async function salvarTarefas() {
      await AsyncStorage.setItem('@task', JSON.stringify(task))
    }
    salvarTarefas()
  }, [task])


  function addTarefa() {
    if (input === '') return;
    setTask([...task, {
      id: input,
      task: input
    }]);
    setModal(!modal);
    setInput('');
  }

  const deleteTask = useCallback((data) => {
    const ache = task.filter(r => r.id !== data.id)
    setTask(ache)
  }
  )

  return (
    <View style={style.container}>
      <StatusBar
        animated={true}
        barStyle='dark-content'
        backgroundColor={'orange'}
      />
      <View>
        <Text style={style.title}>Tarefas</Text>
      </View>

      <FlatList

        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TaskList deletar={deleteTask} data={item} />}
      />

      <Modal
        animationType='slide'
        transparent={false}
        visible={modal}
      >
        <SafeAreaView style={style.modal}>
          <View style={style.modalheader}>
            <TouchableOpacity onPress={() => setModal(!modal)}>
              <Ionicons style={{ marginHorizontal: 5 }} name='md-arrow-back' size={40} color="orange" />
            </TouchableOpacity>
            <Text style={style.modaltitle}>Nova Tarefa</Text>
          </View>

          <Animatable.View style={style.modalBody} animation="fadeInUp" duration={2000} useNativeDriver>
            <TextInput
              placeholder='Oq vamo fazer hoje?'
              style={style.input}
              multiline={true}
              placeholderTextColor='#747474'
              autoCorrect={false}
              value={input}
              onChangeText={text => setInput(text)}
            />
            <TouchableOpacity
              onPress={addTarefa}
              style={style.btnadd}>
              <Text style={style.bodytext}>Pronto!</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>

      </Modal>

      <Animatablebtn
        onPress={() => setModal(!modal)}
        style={style.btn}
        duration={1500}
        useNativeDriver
        animation='bounceInDown'
      >
        <Ionicons name='ios-add' size={55} color="orange" />

      </Animatablebtn>

    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    position: 'absolute',
    width: 60, height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 3,
    zIndex: 9,
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1, height: 3
    },
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  modalheader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: "center"
  },
  modaltitle: {
    marginLeft: 15,
    fontSize: 20,
    color: '#fff'
  },
  modalBody: {
    marginTop: 20
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 10
  },
  btnadd: {
    backgroundColor: 'orange',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 10
  },
  bodytext: {
    fontSize: 20
  }
})

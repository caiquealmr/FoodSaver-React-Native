import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, Modal, Alert, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import styles from './styles';

class Produto {
  constructor(nome, validade) {
    this.nome = nome;
    this.validade = validade;
    this.status = this.calcularStatus();
  }

  calcularStatus() {
    const hoje = moment();
    const dataValidade = moment(this.validade, 'DD/MM/YYYY');
    const diasParaValidade = dataValidade.diff(hoje, 'days');

    if (hoje.isAfter(dataValidade)) {
      return 'Vencido';
    } else if (diasParaValidade <= 30) {
      return 'Alerta';
    } else {
      return 'Normal';
    }
  }
}

class Lista {
  constructor(nome) {
    this.nome = nome;
    this.produtos = [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
    this.ordenarProdutos();
  }

  removerProduto(index) {
    this.produtos.splice(index, 1);
    this.ordenarProdutos();
  }

  ordenarProdutos() {
    this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  verificarNotificacao() {
    const produtosEmAlerta = this.produtos.filter(p => p.status === 'Alerta');
    const produtosVencidos = this.produtos.filter(p => p.status === 'Vencido');

    const mensagens = [];
    if (produtosEmAlerta.length > 0) {
      mensagens.push(`Existem ${produtosEmAlerta.length} itens em risco de vencer, verifique os Itens Em Alerta. Busque consumi-los antes que vençam.`);
    }
    if (produtosVencidos.length > 0) {
      mensagens.push(`Existem ${produtosVencidos.length} itens vencidos, verifique os Itens Vencidos e remova-os de sua Lista.`);
    }

    return mensagens;
  }

  async salvarNoAsyncStorage() {
    try {
      const listas = await AsyncStorage.getItem('listas');
      const listasArray = listas ? JSON.parse(listas) : [];
      listasArray.push(this);
      await AsyncStorage.setItem('listas', JSON.stringify(listasArray));
    } catch (error) {
      console.error("Erro ao salvar a lista:", error);
    }
  }

  static async carregarListasDoAsyncStorage() {
    try {
      const listas = await AsyncStorage.getItem('listas');
      if (listas) {
        return JSON.parse(listas).map(item => {
          const lista = new Lista(item.nome);
          lista.produtos = item.produtos.map(produto => new Produto(produto.nome, produto.validade));
          return lista;
        });
      }
      return [];
    } catch (error) {
      console.error("Erro ao carregar as listas:", error);
      return [];
    }
  }
}

const Stack = createStackNavigator();

const ListScreen = ({ navigation }) => {
  const [listas, setListas] = useState([]);
  const [nomeNovaLista, setNomeNovaLista] = useState('');
  const [filtroNome, setFiltroNome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCriarVisible, setModalCriarVisible] = useState(false);
  const [listaIndexToRemove, setListaIndexToRemove] = useState(null);

  useEffect(() => {
    const carregarListas = async () => {
      const listasCarregadas = await Lista.carregarListasDoAsyncStorage();
      setListas(listasCarregadas);
    };
    carregarListas();
  }, []);

  const criarLista = async () => {
    if (nomeNovaLista.trim()) {
      const novaLista = new Lista(nomeNovaLista);
      await novaLista.salvarNoAsyncStorage();
      setListas(prevListas => [...prevListas, novaLista].sort((a, b) => a.nome.localeCompare(b.nome)));
      setNomeNovaLista('');
      setModalCriarVisible(false);
    }
  };

  const confirmarRemoverLista = (index) => {
    setListaIndexToRemove(index);
    setModalVisible(true);
  };

  const removerLista = async () => {
    const novaLista = listas.filter((_, i) => i !== listaIndexToRemove);
    await AsyncStorage.setItem('listas', JSON.stringify(novaLista));
    setListas(novaLista.sort((a, b) => a.nome.localeCompare(b.nome)));
    setModalVisible(false);
  };

  const listasFiltradas = listas.filter(lista => 
    lista.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/food_saver_icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Criar e Gerenciar Listas</Text>
      </View>
      <Button title="Criar Lista" onPress={() => setModalCriarVisible(true)} color="#579444" />
      <View style={{marginTop: 16}}>
      <TextInput
        style={styles.input}
        value={filtroNome}
        onChangeText={setFiltroNome}
        placeholder="Filtrar por nome..."
      />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={listasFiltradas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItemContainer}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => navigation.navigate('ProductScreen', { listIndex: index, listas, setListas })}
              >
                <Text style={styles.listText}>{item.nome}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarRemoverLista(index)} style={styles.removeButton}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      <Modal
        visible={modalCriarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalCriarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Criar Nova Lista</Text>
            <TextInput
              style={styles.input}
              value={nomeNovaLista}
              onChangeText={setNomeNovaLista}
              placeholder="Nome da nova lista"
            />
            <View style={styles.buttonRow}>
              <Button title="Cancelar" onPress={() => setModalCriarVisible(false)} color="#FF6347" />
              <Button title="Criar" onPress={criarLista} color="#579444" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Confirmar Exclusão</Text>
            <Text>Você realmente deseja excluir esta lista?</Text>
            <View style={styles.buttonRow}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#FF6347" />
              <Button title="Confirmar" onPress={removerLista} color="#579444" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const ProductScreen = ({ route, navigation }) => {
  const { listIndex = 0, listas = [], setListas = () => {} } = route.params || {};

  const [nomeProduto, setNomeProduto] = useState('');
  const [validade, setValidade] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [filtroNome, setFiltroNome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  const [produtoIndexToRemove, setProdutoIndexToRemove] = useState(null);
  const [notificacaoExibida, setNotificacaoExibida] = useState(false);

  useEffect(() => {
    if (!notificacaoExibida) {
      const lista = listas[listIndex];
      const mensagensNotificacao = lista.verificarNotificacao();

      if (mensagensNotificacao.length > 0) {
        mensagensNotificacao.forEach(mensagem => {
          Alert.alert("Notificação", mensagem);
        });
        setNotificacaoExibida(true);
      }
    }
  }, [listas, listIndex, notificacaoExibida]);

  const formatarData = (data) => {
    let dataFormatada = data.replace(/\D/g, '');
    if (dataFormatada.length > 2) {
      dataFormatada = dataFormatada.slice(0, 2) + '/' + dataFormatada.slice(2);
    }
    if (dataFormatada.length > 5) {
      dataFormatada = dataFormatada.slice(0, 5) + '/' + dataFormatada.slice(5);
    }
    return dataFormatada;
  };

  const validarData = (data) => {
    const dataValidade = moment(data, 'DD/MM/YYYY', true);
    return dataValidade.isValid();
  };

  const handleValidadeChange = (text) => {
    const textoFormatado = formatarData(text);
    setValidade(textoFormatado);
  };

  const adicionarProduto = async () => {
    if (nomeProduto.trim() && validade.length === 10 && validarData(validade)) {
      const novaLista = [...listas];
      novaLista[listIndex].adicionarProduto(new Produto(nomeProduto, validade));
      setListas(novaLista);
      await AsyncStorage.setItem('listas', JSON.stringify(novaLista));
      setNomeProduto('');
      setValidade('');
      setModalVisible(false);
    } else {
      console.log("Nome do produto ou validade inválidos");
    }
  };

  const confirmarRemoverProduto = (index) => {
    setProdutoIndexToRemove(index);
    setModalTipo('delete');
    setModalVisible(true);
  };

  const removerProduto = async () => {
    const novaLista = [...listas];
    novaLista[listIndex].removerProduto(produtoIndexToRemove);
    setListas(novaLista);
    await AsyncStorage.setItem('listas', JSON.stringify(novaLista));
    setModalVisible(false);
    navigation.setParams({ listIndex, listas: novaLista, setListas });
  };

  const produtosFiltrados = listas[listIndex]?.produtos.filter(produto => {
    const statusCorreto = filtroStatus === 'Todos' || produto.status === filtroStatus;
    const nomeCorreto = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
    return statusCorreto && nomeCorreto;
  }) || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/food_saver_icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Minha Lista</Text>
      </View>
      <Button
        title="Adicionar Produtos"
        onPress={() => {
          setModalTipo('add');
          setModalVisible(true);
        }}
        color="#579444"
      />

      <View style={styles.filterContainer}>
        {['Todos', 'Normal', 'Alerta', 'Vencido'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filtroStatus === status && styles.filterButtonActive]}
            onPress={() => setFiltroStatus(status)}
          >
            <Text style={styles.filterButtonText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TextInput
        style={styles.input}
        value={filtroNome}
        onChangeText={setFiltroNome}
        placeholder="Filtrar por nome do produto..."
      />

      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{item.nome}</Text>
              <Text style={styles.item}>Validade: {item.validade} ({item.status})</Text>
              <TouchableOpacity onPress={() => confirmarRemoverProduto(
                listas[listIndex].produtos.findIndex(p => p === item)
              )} style={styles.removeButton}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Ver Planilha" onPress={() => navigation.navigate('SpreadsheetScreen', { produtos: produtosFiltrados })} color="#579444" />
        <Button title="Voltar" onPress={() => navigation.goBack()} color="#579444" />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{modalTipo === 'add' ? 'Adicionar Novo Produto' : 'Confirmar Exclusão'}</Text>
            {modalTipo === 'add' ? (
              <>
                <TextInput
                  style={styles.input}
                  value={nomeProduto}
                  onChangeText={setNomeProduto}
                  placeholder="Nome do produto"
                />
                <TextInput
                  style={styles.input}
                  value={validade}
                  onChangeText={handleValidadeChange}
                  placeholder="Validade (DD/MM/AAAA)"
                  keyboardType="numeric"
                />
                <View style={styles.buttonRow}>
                  <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#FF6347" />
                  <Button title="Adicionar" onPress={adicionarProduto} color="#579444" />
                </View>
              </>
            ) : (
              <>
                <Text>Você realmente deseja excluir este produto?</Text>
                <View style={styles.buttonRow}>
                  <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#FF6347" />
                  <Button title="Confirmar" onPress={removerProduto} color="#579444" />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};


const SpreadsheetScreen = ({ route, navigation }) => {
  const { produtos } = route.params || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/food_saver_icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Planilha de Produtos</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Produto</Text>
          <Text style={styles.tableHeaderText}>Validade</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>
        {produtos.map((produto, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{produto.nome}</Text>
            <Text style={styles.tableCell}>{produto.validade}</Text>
            <Text style={styles.tableCell}>{produto.status}</Text>
          </View>
        ))}
      </ScrollView>
      <Button title="Voltar" onPress={() => navigation.goBack()} color="#579444" />
    </View>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="SpreadsheetScreen" component={SpreadsheetScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

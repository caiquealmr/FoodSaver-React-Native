# **Projeto - FoodSaver**

[Acesse o FoodSaver no Snack.Expo](https://snack.expo.dev/@caiquealmr/foodsaver)

- **Nome do Aluno:** Caíque Almeida Amaral
- **Matrícula:** 202305874
- **Curso:** Sistemas de Informação
- **Evento:** InovaWeek 2024
- **Instituição:** Universidade Vila Velha (UVV)

> Projeto desenvolvido para o evento InovaWeek da UVV, com o objetivo de criar uma solução tecnológica inovadora para combater o desperdício de alimentos através do gerenciamento inteligente de datas de validade.

---

## **O Projeto**

**FoodSaver** é um aplicativo mobile desenvolvido em React Native que visa combater o desperdício de alimentos através do gerenciamento inteligente de produtos e suas datas de validade. O aplicativo permite que usuários:

- Criem múltiplas listas de produtos
- Monitorem datas de validade
- Recebam alertas sobre produtos próximos ao vencimento
- Visualizem dados em formato de planilha
- Gerenciem seu estoque de forma eficiente

O projeto nasceu da necessidade de oferecer uma solução prática e acessível para o problema do desperdício de alimentos, permitindo que usuários tenham maior controle sobre seus produtos e suas datas de validade.

---

## **Tecnologias Utilizadas**

| Tecnologia           | Descrição                                       |
|----------------------|-------------------------------------------------|
| **React Native**     | Framework principal para desenvolvimento mobile |
| **React Navigation** | Sistema de navegação entre telas                |
| **AsyncStorage**     | Armazenamento local de dados                    |
| **Moment.js**        | Biblioteca para manipulação de datas            |
| **Expo**             | Plataforma de desenvolvimento                   |

---

## **Funcionalidades Principais**

### **1. Gerenciamento de Listas**
- Criação de múltiplas listas personalizadas
- Filtragem de listas por nome
- Sistema de exclusão com confirmação
- Organização automática em ordem alfabética

### **2. Controle de Produtos**
- Adição de produtos com nome e data de validade
- Sistema automático de status:
  - **Normal:** Mais de 30 dias até o vencimento
  - **Alerta:** Menos de 30 dias até o vencimento
  - **Vencido:** Produto com data expirada
- Filtragem por status e nome
- Remoção com confirmação

### **3. Sistema de Notificações**
- Alertas automáticos para produtos próximos ao vencimento
- Notificações de produtos vencidos
- Recomendações para consumo prioritário

### **4. Visualização de Dados**
- Interface em formato de planilha
- Filtros por status
- Ordenação alfabética
- Indicadores visuais de status

---

# **Como Utilizar o FoodSaver**

### **Pré-requisitos**

1. **Para Usuários**
   - Dispositivo Android
   - Ou acesso ao Expo Go

### **Instalação Direta (Android)**

Devido ao tamanho do arquivo .apk (cerca de 65 MB), o download não está hospedado no GitHub. Para baixar o aplicativo, siga o link abaixo e depois execute o passo a passo:

[Download FoodSaver.apk](https://drive.google.com/file/d/16ZrbHgNC7maNIqAMuWAaLu2g1gsq7-iK/view?usp=drive_link)

1. Baixe o arquivo `FoodSaver.apk`
2. Transfira-o para seu dispositivo Android
3. Execute a instalação seguindo as instruções na tela

---

### **Guia de Uso**

1. **Criando uma Lista**
   1. Abra o aplicativo
   2. Toque no botão "Criar Lista"
   3. Digite o nome da lista
   4. Confirme a criação

2. **Gerenciando Produtos**
   1. Selecione uma lista
   2. Use "Adicionar Produtos" para incluir itens
   3. Preencha nome e data de validade
   4. Monitore o status dos produtos

3. **Utilizando Filtros**
   1. Use os botões de filtro por status
   2. Digite no campo de busca para filtrar por nome
   3. Visualize produtos por categoria

4. **Consultando a Planilha**
   1. Acesse "Ver Planilha"
   2. Visualize todos os produtos organizados
   3. Use os cabeçalhos para ordenação

---

### **Links Úteis**

- **React Native**: [https://reactnative.dev/docs](https://reactnative.dev/docs)
- **Expo**: [https://docs.expo.dev](https://docs.expo.dev)
- **AsyncStorage**: [https://react-native-async-storage.github.io/async-storage/](https://react-native-async-storage.github.io/async-storage/)
- **Moment.js**: [https://momentjs.com/docs/](https://momentjs.com/docs/)

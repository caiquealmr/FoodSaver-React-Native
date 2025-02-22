import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EEF2E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  scrollContainer: {
    flex: 1,
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fffafa',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 2,
    borderRadius: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },

  listItem: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fffafa',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 12,
    marginVertical: 2,
    justifyContent: 'space-between',
  },

  item: {
    fontSize: 18,
    color: '#000000',
    flex: 1,
  },

  listText: {
    fontSize: 18,
    color: '#000000',
  },
  removeButton: {
    padding: 8,
    borderRadius: 4,
  },
  removeText: {
    fontSize: 18,
    color: 'red',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#579444',
  },
  filterButtonActive: {
    backgroundColor: '#90d051',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#579444',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#f8f8ff',
  },
  tableCell: {
    flex: 1,
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default styles;

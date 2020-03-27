import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,   /* faz com que ele ocupe o espaço completamente */
        paddingHorizontal: 24,  /* só existe no Native. Quero adicionar espaço nas laterais */
        paddingTop: Constants.statusBarHeight + 20,  /* Vou obter a largura da barra de status do celular e colocar 20px a mais */ 
    },

    header: {
        flexDirection: 'row', /* o padrão é column */
        justifyContent: 'space-between',  /* horizontalmente */
        alignItems: 'center', /* verticalmente */
    },

    headerText: {
        fontSize: 16,
        color: '#737360',
    },

    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold',
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

    incidentList: {
        marginTop: 32,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16, /* para se distanciar dos demais */
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
    }
});
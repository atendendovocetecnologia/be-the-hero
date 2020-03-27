import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0);

    // controle da paginação
    const [page, setPage] = useState(1);            /* não dá para começar por 0, vide backend */
    const [loading, setLoading] = useState(false);  /* quando a gente está buscando dados novos no scroll 
                                                        para evitar que esses dados sejam buscados 
                                                        novamente. Carregando uma página por vez */

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return; /* porquê ? Evitar que outra requisição seja feita, que outra requisição venha acontecer 
                    puxando para baixo várias vezes o scroll sem parar. */
        }

        /* se total for maior que 0 (ou seja carregou a página) e a qtd de incidentes for igual ao total */
        if (total > 0 && incidents.length == total) {
            // não faz sentido buscar mais informações */
            return;  
        }

        setLoading(true);

        //const response = await api.get('incidents');
        const response = await api.get('incidents', {
            params: { page }
        });
        //setIncidents(response.data);  /* .data é sobrescrito com os dados provenientes da nossa API */
        setIncidents([... incidents, ... response.data]);  /* forma para anexar 2 vetores dentro de um único vetor no caso incidents */
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);

        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList} 
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}        /* elimina a visualizacao do scroll vertical */
                onEndReached={loadIncidents}             /* esta propriedade aceita uma função que é disparada quando o usuário chega no final da lista */
                onEndReachedThreshold={0.2}                 /* se ele estiver a 20% do final da lista, eu vou carregar os novos itens */
                data={incidents}
                renderItem={({ item: incident }) => (       /* para não confundir renomeia o item para incident */
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>
        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}>

                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>        
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}         /* funcao para renderizar quanda item do incidente */
            />
        </View>
    );
}
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';

const ALL_SERVICES_DATA = [
    { 
        name: 'Carteirinha Offline', 
        icon: 'id-card', 
        description: 'A CED oferece a possibilidade de utilizar a sua carteirinha de estudante digital...',
        details: 'A CED oferece a possibilidade de utilizar a sua carteirinha de estudante digital sem precisar de acesso a internet! Basta baixar sua credencial e poder usar onde e quando quiser!',
        screen: 'Credencial' 
    },
    { 
        name: 'Calendário', 
        icon: 'calendar-today', 
        description: 'O calendário da CED é integrado ao da escola...',
        details: 'O calendário da CED é integrado ao da escola, exibe e marca os dias que tem eventos, campanhas, provas e muito mais! Muito valioso para estar sempre atualizado sobre tudo de importante que a escola tem para dizer.',
        screen: 'Calendário' 
    },
    { 
        name: 'Frequência Escolar', 
        icon: 'check-circle', 
        description: 'Acompanhe sua frequência escolar.',
        details: 'A frequência é incorporada a da escola, sendo assim, pode acompanhar sua presença nas aulas e ter um controle maior sobre as matérias e faltas. A frequência é atualizada automaticamente quando uma chamada é feita.',
        screen: 'Frequência' 
    },
    { 
        name: 'Suporte', 
        icon: 'support-agent', 
        description: 'Entre em contato com o suporte técnico.',
        details: 'O suporte é personalizado e estamos sempre a disposição de qualquer dúvida que encontrar.',
        screen: 'Suporte' 
    },
    { name: 'Configurações', icon: 'settings', description: 'Ajuste as configurações do seu aplicativo.', details: 'Gerencie suas preferências de notificação, segurança e privacidade.', screen: 'Configurações' }, // Nome da rota no DrawerNavigator
    { name: 'Dados', icon: 'person', description: 'Visualize e edite seus dados pessoais.', details: 'Mantenha suas informações cadastrais sempre atualizadas.', screen: 'Dados' }, // Assumindo que 'Dados' está no TabNavigator ou Stack
    { name: 'Eventos', icon: 'event', description: 'Fique por dentro dos eventos da escola.', details: 'Veja a agenda completa de eventos, campanhas e atividades escolares.', screen: 'Eventos' }, // Assumindo que 'Eventos' está no TabNavigator ou Stack
    { name: 'Ingressos', icon: 'local-activity', description: 'Acesse seus ingressos para eventos.', details: 'Visualize e gerencie seus ingressos digitais para eventos e atividades.', screen: 'Ingressos' }, // Assumindo que 'Ingressos' está no TabNavigator ou Stack
    { name: 'Notícias', icon: 'article', description: 'Leia as últimas notícias da escola.', details: 'Receba comunicados e novidades importantes diretamente no seu celular.', screen: 'Notícias' }, // Nome da rota no DrawerNavigator
];

const ServiceItem = ({ item, navigation, expandedItem, setExpandedItem }) => {
    const isExpanded = expandedItem === item.name;

    const handlePress = () => {
        setExpandedItem(isExpanded ? null : item.name);
    };

    const handleNavigate = () => {
        if (item.screen) {
            try {
                navigation.navigate(item.screen);
            } catch (e) {
                Alert.alert('Erro de Navegação', `A tela "${item.screen}" não foi encontrada no seu navegador. Verifique o nome da rota no TabNavigator ou DrawerNavigator.`);
            }
        } else {
            Alert.alert('Funcionalidade', `A tela de ${item.name} ainda não foi implementada.`);
        }
    };

    return (
        <View style={styles.serviceItemContainer}>
            <View style={styles.serviceItem}>
                <TouchableOpacity style={styles.serviceTextContainer} onPress={handlePress}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                </TouchableOpacity>
             
                <TouchableOpacity onPress={handleNavigate}>
                    <MaterialIcons name="keyboard-arrow-right" size={30} color="#B91C1C" />
                </TouchableOpacity>
            </View>

            {isExpanded && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>{item.details}</Text>
                </View>
            )}
        </View>
    );
};


export default function Home({ navigation }) {
    const [userName, setUserName] = useState('Usuário');
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const { data: estudante } = await supabase
                        .from('estudantes')
                        .select('nome')
                        .eq('auth_uid', session.user.id)
                        .single();
                    if (estudante && estudante.nome) {
                        setUserName(estudante.nome);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar nome do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserName();
    }, [navigation]);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível sair da sua conta.');
        }
    };

    const filteredServices = useMemo(() => {
        const lowerCaseSearch = searchText.toLowerCase();
        
        if (!searchText) {
            return ALL_SERVICES_DATA.slice(0, 4);
        }

        return ALL_SERVICES_DATA.filter(service => 
            service.name.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchText]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Olá, {userName}</Text> 
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <FontAwesome name="sign-out" size={24} color="#B91C1C" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.iconRow}>
                    <View style={styles.iconItem}>
                        <FontAwesome name="graduation-cap" size={40} color="#B91C1C" />
                        <Text style={styles.iconText}>Aprendizagem</Text>
                    </View>
                    <View style={styles.iconItem}>
                        <FontAwesome name="check-circle" size={40} color="#B91C1C" />
                        <Text style={styles.iconText}>Validação</Text>
                    </View>
                    <View style={styles.iconItem}>
                        <FontAwesome name="lock" size={40} color="#B91C1C" />
                        <Text style={styles.iconText}>Privacidade</Text>
                    </View>
                </View>

                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Encontre serviços na CED"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <MaterialIcons name="search" size={24} color="#B91C1C" style={styles.searchIcon} />
                </View>

                <View style={styles.serviceList}>
                    {filteredServices.map((item) => (
                        <ServiceItem 
                            key={item.name} 
                            item={item} 
                            navigation={navigation}
                            expandedItem={expandedItem}
                            setExpandedItem={setExpandedItem}
                        />
                    ))}
                    {filteredServices.length === 0 && searchText && (
                        <Text style={styles.noResultsText}>Nenhum serviço encontrado para "{searchText}".</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E40AF',
    },
    logoutButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    iconItem: {
        alignItems: 'center',
        width: '30%',
    },
    iconText: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
        color: '#333',
    },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    searchIcon: {
        marginLeft: 10,
    },
    serviceList: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    serviceItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    serviceTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E40AF',
    },
    detailsContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        backgroundColor: '#F9F9F9',
    },
    detailsText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    noResultsText: {
        textAlign: 'center',
        padding: 20,
        color: '#777',
    }
});
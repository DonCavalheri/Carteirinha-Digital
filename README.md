# 📱 CED - Carteirinha de Estudante Digital
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React Native](https://img.shields.io/badge/React%20Native-0.74-blue)
![Supabase](https://img.shields.io/badge/Supabase-integrado-green)
![Licença MIT](https://img.shields.io/badge/license-MIT-green)

Aplicativo mobile desenvolvido em **React Native** com integração ao **Supabase**, permitindo login, cadastro e acesso a funcionalidades como eventos, ingressos e credencial de estudante.  

---

## ✨ Funcionalidades

- 🔑 Autenticação de usuários (login/cadastro) via Supabase  
- 🏷️ Exibição da carteirinha de estudante digital  
- 📅 Acesso a eventos e ingressos  
- 💾 Cache local para manter login offline  
- 🖥️ Interface moderna e simples de usar  

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)  
- [Supabase](https://supabase.com/)  
- [React Navigation](https://reactnavigation.org/)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)  

---

## 📂 Estrutura do Projeto
```
CED/
├── assets/                # Imagens, ícones
│   └── logo.png
│
├── src/
│   ├── screens/           # Cada tela do app
│   │   ├── SplashScreen.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Credencial.js
│   │   ├── Dados.js
│   │   ├── Home.js
│   │   ├── ForgotPassword.js
│   │   ├── Eventos.js
│   │   ├── Ingressos.js
│   │   ├── Frequencia.js
│   │   ├── Calendario.js
│   │   ├── Notificacoes.js
│   │   └── Configuracoes.js
│   │
│   ├── components/        # Botões, cards, cabeçalhos reutilizáveis
│   │   └── CustomButton.js
│   │
│   ├── navigation/        # Stack e Tab Navigator
│   │   ├── StackNavigator.js
│   │   └── TabNavigator.js
│   │
│   └── services/
│       └── supabase.js     # Conexão com Supabase
│
├── App.js                 # Chama a navegação
```

---

## 🤝 Contribuindo
Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto

2. Crie uma branch com sua feature (git checkout -b minha-feature)

3. Commit suas alterações (git commit -m 'Adiciona nova feature')

4. Envie sua branch (git push origin minha-feature)

5. Abra um Pull Request

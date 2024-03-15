var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const users = [];
function fetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.github.com/users/${username}`);
        const user = yield response.json();
        if (user.message) {
            alert(`usuario ${username} não encontrado!`);
        }
        else {
            alert(`
        Salvando usuário ${username}...
        ID: ${user.id}
        Login: ${user.login}
        Nome: ${user.name}
        Bio: ${user.bio}
        Número de repositórios públicos: ${user.public_repos}
        `);
            users.push(user);
        }
    });
}
function firstMenuOption() {
    return __awaiter(this, void 0, void 0, function* () {
        const username = prompt(`Digite o nome do usuário a ser salvo`);
        yield fetchUser(username);
    });
}
function showUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = users.find(user => user.login === username);
        if (typeof user === "undefined") {
            alert(`Usuário ${username} não encontrado!`);
        }
        else {
            const response = yield fetch(user.repos_url);
            const repositories = yield response.json();
            let message = `ID: ${user.id} \n Login: ${user.login} \n Name: ${user.name} \n Bio: ${user.bio} \n Repositórios Públicos: ${user.public_repos} \n\n Informações dos repositórios: \n`;
            repositories.forEach(repository => {
                message += `Nome do repositório: ${repository.name} \n Descrição: ${repository.description} \n Estrelas: ${repository.stargazers_count} \n É um fork? ${repository.fork ? `Sim` : `Não`} \n`;
            });
            alert(message);
        }
    });
}
function secoundMenuOption() {
    return __awaiter(this, void 0, void 0, function* () {
        const username = prompt(`Insira o nome do usuário que deseja listar as informações`);
        yield showUser(username);
    });
}
function thirdMenuOption() {
    if (users.length > 0) {
        const allUsers = users.map((user) => `- ${user.login}`).join(`\n`);
        alert(allUsers);
    }
    else {
        alert(`Ainda não há nenhum usuário cadastrado`);
    }
}
function fourthMenuOption() {
    let repositoriesSum = 0;
    users.forEach(repository => {
        repositoriesSum += repository.public_repos;
    });
    alert(repositoriesSum);
}
function fifthMenuOption() {
    const sortedUsers = users.sort((a, b) => b.public_repos - a.public_repos);
    const topFiveUsers = sortedUsers.slice(0, 5);
    let message = `Top 5 usuários com maior número de repositórios públicos: \n`;
    topFiveUsers.forEach((user, index) => {
        message += `${index + 1}º: ${user.name} - ${user.public_repos} \n`;
    });
    if (users.length > 0) {
        alert(message);
    }
    else {
        alert(`Ainda não há usuários cadastrados.`);
    }
}
(() => __awaiter(this, void 0, void 0, function* () {
    let menuOptions;
    do {
        menuOptions = +prompt(`
        O que deseja fazer?
        1. Salvar usuário
        2. Listar informações de todos os usuários salvos e seus repositórios público
        3. Mostrar todos os usuários salvos
        4. Mostrar a soma de todos os repositórios públicos salvos
        5. Mostrar os 5 usuários com mais repositórios públicos salvos
        6. Sair
        `);
        switch (menuOptions) {
            case 1:
                yield firstMenuOption();
                break;
            case 2:
                yield secoundMenuOption();
                break;
            case 3:
                thirdMenuOption();
                break;
            case 4:
                fourthMenuOption();
                break;
            case 5:
                fifthMenuOption();
                break;
            case 6:
                alert(`Encerrando o sistema...`);
                break;
            default:
                alert(`Insira uma opção válida`);
        }
    } while (menuOptions !== 6);
}))();

import { ModuleType } from "@/@types/appContext";

const prompts = {
    generateModules: (themeStudy: string) => {
        return `Por favor, monte um plano de estudo personalizado para o tema: '${themeStudy}'. Você deve montar módulos para os diferentes temas a serem abordados. Cada módulo deve ser rico em conteúdo, contudo, por enquanto você deve devolver somente o título e uma breve descrição do que será abordado em cada módulo. Por favor devolva o resultado em json. Crie quantos módulos forem necessários, mas limitando-se a no máximo 20 módulos. Exemplo de resposta: 'planoEstudo: [{title,description},{...},....]'. RESPOSTA:`;
    },
    generateModule: (module: ModuleType) => {
        return `Por favor, gere o conteúdo do módulo: '${module.title}'. Desenvolva com base na descrição: '${module.description}', sem fugir do tema. O conteúdo deve ser rico, contendo imagens para ilustrar as informações quando possível, ou quando não for possível, um link para uma imagem. Por favor devolva a página HTML em um json. Exemplo de resposta: 'modulo: [{"html": string do html},{...},...]'. RESPEITE O MODELO DO JSON. NÂO DEVOLVA UMA PÁGINA HTML, APENAS OS ELEMENTOS DO BODY (H1, P, SPAN, ETC). RESPOSTA:`;
    }
};

export default prompts;

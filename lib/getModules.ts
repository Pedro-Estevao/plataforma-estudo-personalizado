import { useAppContext } from "@/contexts/appContext";
import prompts from "./prompts";

const getModules = async (themeStudy: string) => {
    // const { introduction, setIntroduction } = useAppContext();

    const propt = prompts.generateModules(themeStudy);
    const modules = prompts.generateModules(themeStudy);

    return modules;
};

export default getModules;
import { IAccountStatistics } from "./account";

export interface AchievementsProps {
  statistics: IAccountStatistics;
}

export interface IAchievementsList {
  name: string;
  description: string;
  iconName: string;
  completed: boolean;
}

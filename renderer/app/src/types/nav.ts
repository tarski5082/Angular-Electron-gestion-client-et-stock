export interface NavItem {
  label: string;
  link?: string;
  open?: boolean; // Permet de savoir si l'accordéon est ouvert
  children?: NavItem[];
}
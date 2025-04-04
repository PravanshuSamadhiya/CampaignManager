export interface Campaign {
  id: string; 
  name: string;
  description: string;
  leads: string[]; 
  accountIDs: string[]; 
  status: "ACTIVE" | "INACTIVE"; 
}

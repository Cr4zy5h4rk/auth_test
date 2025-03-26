export interface UserInfo {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE' | string; // Vous pouvez utiliser une enum pour plus de rigueur
    birthDate: string | Date; // ou Date si vous convertissez les strings en Date
    email: string | null;
    password: string | null;
    fidelityPoints: number;
    bloodType: string; // Vous pourriez utiliser une enum pour les types sanguins
    resusType: string; // De même pour les types Rhésus
    receiveOtpForBloodRequest: boolean;
    lastDonationDate: string | Date | null;
    address: String | null;
    favorites: any[]; // Remplacez "any" par un type plus spécifique si possible
    roles: any[];
    medicalStaff: any | null; // Spécifiez un type approprié
    createdBloodRequests: any | null; // Spécifiez un type approprié
    canceledBloodRequests: any | null; // Spécifiez un type approprié
    employees: any | null; // Spécifiez un type approprié
    picture: string | null;
  }
  
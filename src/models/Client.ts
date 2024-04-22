interface EmailProps {
  id: string;
  email: string;
  type: string;
}

interface PhoneProps {
  id: string;
  number: string;
  type: string;
}

export interface Client {
  id: string;
  name: string;
  last_name: string;
  emails: EmailProps[];
  phone_numbers: PhoneProps[];
}

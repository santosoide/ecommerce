import * as Yup from 'yup';

import { validateCPF } from './cpfValidation';
import { validateCreditCard } from './creditCardValidation';
import { validateBirthdate, validateExpirationDate } from './dateService';

const personalDataValidation = Yup.object({
  cpf: Yup.string()
    .ensure()
    .required('Por favor, informe o CPF.')
    .length(14, 'O CPF deve possuir 11 caracteres.')
    .test('isValid', 'Por favor, informe um CPF válido.', validateCPF),
  fullName: Yup.string()
    .ensure()
    .required('Por favor, informe o seu nome completo.')
    .matches(
      /^[A-Za-zÀ-ú'’]{2,}(?: [A-Za-zÀ-ú'’]+){1,20}$/,
      'Por favor, informe o seu nome completo.'
    ),
  phone: Yup.string()
    .ensure()
    .required('Por favor, informe o seu celular.')
    .length(15, 'Por favor, informe o seu celular.'),
  birthdate: Yup.string()
    .ensure()
    .required('Por favor, informe a data de nascimento.')
    .length(10, 'Por favor, informe a data de nascimento.')
    .test('isValid', 'Você precisa ser maior de 18 anos.', validateBirthdate),
  email: Yup.string()
    .ensure()
    .required('Por favor, informe seu endereço de email.')
    .email('Por favor, digite um endereço de email válido.'),
});

const paymentValidation = Yup.object({
  fullName: Yup.string()
    .ensure()
    .required('Por favor, informe o seu nome completo.')
    .matches(
      /^[A-Za-zÀ-ú'’]{2,}(?: [A-Za-zÀ-ú'’]+){1,20}$/,
      'Por favor, informe o seu nome completo.'
    ),
  cardNumber: Yup.string()
    .ensure()
    .required('Por favor, informe o número do cartão.')
    .length(19, 'Por favor, informe o número do cartão.')
    .test('isValid', 'Por favor, informe um número de cartão válido.', validateCreditCard),
  expirationDate: Yup.string()
    .ensure()
    .required('Por favor, informe a data de validade do cartão.')
    .length(5, 'Por favor, informe a data de validade do cartão.')
    .test('isValid', 'Data de validade expirada.', validateExpirationDate),
  cvv: Yup.string()
    .ensure()
    .required('Por favor, informe o código de segurança do cartão.')
    .length(3, 'Por favor, informe o código de segurança do cartão.'),
});

const addressValidation = Yup.object({
  zipCode: Yup.string()
    .ensure()
    .required('Por favor, informe o seu CEP.')
    .length(9, 'O CEP deve possuir 8 caracteres.'),
  street: Yup.string()
    .ensure()
    .required('Por favor, informe o nome da sua rua.'),
  number: Yup.string()
    .ensure()
    .required('Por favor, informe o número.'),
  complement: Yup.string()
    .ensure()
    .notRequired(),
  neighborhood: Yup.string()
    .ensure()
    .required('Por favor, informe o bairro.'),
  city: Yup.string()
    .ensure()
    .required('Por favor, informe a cidade.'),
  state: Yup.string()
    .ensure()
    .required('Por favor, informe o estado.'),
});

export { personalDataValidation, paymentValidation, addressValidation };

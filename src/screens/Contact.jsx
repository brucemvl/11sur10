import React, { useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const sendEmail = () => {
    const formData = new FormData();
    formData.append('user_name', name);
    formData.append('user_email', email);
    formData.append('message', message);

    // Replace with your EmailJS user service and template ID
    const serviceID = 'react_contact';
    const templateID = 'react_contact_11/10';
    const userID = 'monnerville';

    axios
      .post(`https://api.emailjs.com/api/v1.0/email/send`, {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: {
          user_name: name,
          user_email: email,
          message: message,
        },
      })
      .then((response) => {
        console.log('Email sent', response.data);
        alert('Message envoyé avec succès!');
      })
      .catch((error) => {
        console.error('Error sending email', error);
        alert('Erreur lors de l\'envoi du message');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Envoyer" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Contact;
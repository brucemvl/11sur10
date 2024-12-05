import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    // Remplacez par vos IDs de service, template et user
    const serviceID = 'react_contact'; // Vérifiez que ce serviceID est correct
    const templateID = 'react_contact_11/10'; // Vérifiez ce templateID
    const userID = '5a9QlNXeINK_p0GwQ'; // Assurez-vous que ce userID est valide

    // Requête HTTP avec axios
    axios
      .post(
        'https://api.emailjs.com/api/v1.0/email/send', // URL correcte de l'API
        {
          service_id: serviceID,
          template_id: templateID,
          user_id: userID,
          template_params: {
            user_name: name,
            user_email: email,
            message: message,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json', // Assurez-vous de définir le bon Content-Type
          },
        }
      )
      .then((response) => {
        console.log('Email sent', response.data);
        alert('Message envoyé avec succès!');
      })
      .catch((error) => {
        console.error('Error sending email', error);
        alert("Erreur lors de l'envoi du message");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <LinearGradient colors={[ 'rgba(24, 24, 91, 1)', 'rgba(0, 0, 0, 1)']} style={styles.inputs}>
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
      </LinearGradient>
      <Button title="Envoyer" onPress={sendEmail} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "Kanitt"
  },
  inputs: {
backgroundColor: "midnightblue",
padding: 20,
marginBottom: 40,
borderRadius: 15
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily:"Kanitus",
    backgroundColor: "white"
  },
  
});

export default Contact;
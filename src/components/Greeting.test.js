// screen donne accès à ce qui est affiché
import { render, screen } from '@testing-library/react';

// Pour gérer les évenements
import userEvent from '@testing-library/user-event';

// Import du component à tester
import Greeting from './Greeting'

// Lorsqu'on écrit un test on suit les trois 'A'
// Arrange : Mettre en place le test, rendre le composent en question par exemple
// Act : Ecrire la logique que nous voulons tester, click d'un boutton par exemple
// Assert : Voir si les résultats attendus sont donnés

// On veut créer des groupes de tests, pour une meilleure organisation/lisibilité dans commande
// Ici on créé une test suite, qui pourra avoir plusieurs tests
describe("Greeting component", () => {
    test('renders "Hello World" as a text', () => {
        // Arrange :  render the greeting component
        render(<Greeting />);

        // Act 
        // Rien pour ce test

        // Assert
        const helloWorldElement = screen.getByText('Hello World!');
        expect(helloWorldElement).toBeInTheDocument();
    });


    test('renders "good to see you" if the button was NOT clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        // Rien pck on ne clique pas sur le button

        // Assert
        const paragraphElement = screen.getByText('good to see you', { exact: false });
        expect(paragraphElement).toBeInTheDocument();
    });


    test('renders "Changed!" if the button was clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button'); // Fonctionne car un seul button
        userEvent.click(buttonElement);

        // Assert
        const paragraphElement = screen.getByText('Changed!', { exact: true });
        expect(paragraphElement).toBeInTheDocument();
    });


    // On veut vérifier si la paragraphe a bien disparu au click
    // On pourrait avoir oublier une logique
    test('does not render "good to see you" if the button was clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button'); // Fonctionne car un seul button
        userEvent.click(buttonElement);

        // Assert
        const paragraphElement = screen.queryByText('good to see you', { exact: false }); // query return null si element not found
        expect(paragraphElement).toBeNull();
    });
});


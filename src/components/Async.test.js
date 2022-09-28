import { render, screen } from '@testing-library/react';
import Async from './Async';

describe("Async component", ()=>{
    test('renders posts if request succeeds', async ()=>{

        // On veut remplacer la fonction fetch par une fonction mock
        // Fonction de simulation pour éviter de faire du trafic réseau supplémentaire
        // Et gérer la réponse attendue
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: "p1", title: 'First post'}]
        });



        render(<Async/>)

        // Ce test va échouer car get regarde instant si il y a des li
        // const listItemElements = screen.getAllByRole('listitem');

        // On va donc utiliser find, qui permet de gérer l'asynchrone
        // find("role", {exact}, timeout) si on veut
        // Sinon la durée par défaut est de 1 seconde

        // Ne pas oublier de faire ce test async/await, sinon la partie Assert sera faussée
        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    });
});
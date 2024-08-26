describe('Enviar mensaje', { testIsolation: false }, () => {

    it('Validar envío de form vacío', () => {
        const errorMessages = [
            'Subject must be between 5 and 100 characters.',
            'Subject may not be blank',
            'Name may not be blank',
            'Message must be between 20 and 2000 characters.',
            'Message may not be blank',
            'Email may not be blank',
            'Phone may not be blank',
            'Phone must be between 11 and 21 characters.'
        ];
        cy.visit('https://automationintesting.online/')
        cy.log('Envío de form de contacto en blanco...')
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')
        errorMessages.forEach(message => {
            cy.get('p').contains(message);
        })
    });



    it('Validar envío de form con data incorrecta', () => {
        cy.LLenarForm('asd', 'asdasd', 'asdasd', 'asdasd', 'asdasd');
        cy.get('.alert').should('be.visible')

        cy.get('p').contains('Phone must be between 11 and 21 characters.')
        cy.get('p').contains('debe ser una dirección de correo electrónico con formato correcto')
        cy.get('p').contains('Message must be between 20 and 2000 characters.')
    });



    it('Validar envío de form con data correcta', () => {
        cy.LLenarForm('Juan Pérez', 'juan@gmail.com', '35123696457', 'Reserva de habitación para fecha X', 'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo');
    });



    it('Verifica que la información del hotel esté presente en la página.', () => {
        cy.log('Info del hotel presente en la página...')
        cy.contains('Shady Meadows B&B').should('be.visible')
        cy.contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S').should('be.visible')
        cy.contains('012345678901').should('be.visible')
        cy.contains('fake@fakeemail.com').should('be.visible')


    })

    it('Asegurate de que haya al menos una imagen visible', () => {
        cy.log('Al menos una imagen visible...')
        cy.get('.hotel-logoUrl').should('be.visible')

    })

    it('Confirma que el texto de la descripción del hotel sea el esperado.', () => {
        cy.log('Texto de la descripcion del hotel sea el esperado...')
        cy.get('.col-sm-10 > p').should('contain', 'Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')

    })



    it('Realizar un test que valide que el mensaje haya sido enviado con éxito por medio de la API', () => {
        cy.log('Validacion de que el mensaje se envio correctamennte por medio de la API...')
        const name = 'Juan Pérez';

        cy.intercept('POST', 'https://automationintesting.online/message/').as('sendMessage');
        cy.LLenarForm(name, 'juan@gmail.com', '35123696457', 'Reserva de habitación para fecha X', 'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo');
        cy.wait('@sendMessage').its('response.statusCode').should('eq', 200);
        cy.get(':nth-child(2) > div > h2').should('be.visible').and('contain', 'Thanks for getting in touch asd' + name + '!');

    })

    it('Test que valide una solicitud y estado de respuesta de la API', () => {
        cy.log('Test que valide una solicitud y estado de respuesta de la API...')
        cy.intercept('https://automationintesting.online/report/room/1').as('apiRequest');
        cy.get('.btn').click();
        cy.wait('@apiRequest').its('response.statusCode').should('eq', 200);


    })
})



// Reporte de bugs: trello: https://trello.com/invite/b/66be664e72491e01a4cd4795/ATTI0ef7ec41e58daa62fb561be8ca6a8875E88D46F9/qa-automation













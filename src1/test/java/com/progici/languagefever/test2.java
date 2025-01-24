package com.progici.languagefever;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.enums.Role;
import com.progici.languagefever.repository.KorisniciRepository;
import com.progici.languagefever.service.KorisnikService;

@ExtendWith(MockitoExtension.class)
public class test2 {

    @Mock
    private KorisniciRepository korisniciRepository;

    @InjectMocks
    private KorisnikService korisnikService;

    @Test
    public void testGetAllAdminRoles() {
        Korisnik admin1 = new Korisnik();
        admin1.setName("Admin One");
        admin1.setEmail("admin1@example.com");
        admin1.setRole(Role.ROLE_ADMIN);

        Korisnik admin2 = new Korisnik();
        admin2.setName("Admin Two");
        admin2.setEmail("admin2@example.com");
        admin2.setRole(Role.ROLE_ADMIN);

        List<Korisnik> adminList = Arrays.asList(admin1, admin2);

        when(korisniciRepository.findByRole(Role.ROLE_ADMIN)).thenReturn(adminList);

        List<Korisnik> result = korisnikService.getAllAdminRoles();

        assertEquals(2, result.size());
        assertEquals("Admin One", result.get(0).getName());
        assertEquals("Admin Two", result.get(1).getName());
    }

    @Test
    public void testGetAllUserRoles() {
        Korisnik user1 = new Korisnik();
        user1.setName("User One");
        user1.setEmail("user1@example.com");
        user1.setRole(Role.ROLE_USER);

        Korisnik user2 = new Korisnik();
        user2.setName("User Two");
        user2.setEmail("user2@example.com");
        user2.setRole(Role.ROLE_USER);

        List<Korisnik> userList = Arrays.asList(user1, user2);

        when(korisniciRepository.findByRole(Role.ROLE_USER)).thenReturn(userList);

        List<Korisnik> result = korisnikService.getAllUserRoles();

        assertEquals(2, result.size());
        assertEquals("User One", result.get(0).getName());
        assertEquals("User Two", result.get(1).getName());
    }
}
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Register } from "../../pages/Register";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://goscrum-api.alkemy.org/auth/data", (req, res, ctx) => {
    return res(
      ctx.json({
        result: {
          contiente: ["America", "Europa", "Otro"],
          registro: ["Otro", "Latam", "Brasil", "America del Norte"],
          Rol: ["Team Member", "Team Leader"],
        },
      })
    );
  })
);

it("fetch server role option", async () => {
  server.listen();
  server.use(
    rest.get("http://goscrum-api.alkemy.org/auth/data", (req, res, ctx) => {
      return res(
        ctx.json({
          result: {
            contiente: ["America", "Europa", "Otro"],
            registro: ["Otro", "Latam", "Brasil", "America del Norte"],
            Rol: ["Team Member", "Team Leader"],
          },
        })
      );
    })
  );

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  const role = await screen.findByText("Rol");
  expect(role).toBeInTheDocument();

  const America = await screen.findByText("Region");
  expect(America).toBeInTheDocument();
  server.close();
});

it("fetch role options", async () => {
  render(<Register />, { wrapper: MemoryRouter });
  
  expect(
    await screen.findByText("Rol")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Continente")
  ).toBeInTheDocument();
  const America = await screen.findByText("Region");
  expect(America).toBeInTheDocument();
});

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Team {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export function Standings() {
  const teams: Team[] = [
    {
      position: 1,
      name: "Palmeiras",
      played: 15,
      won: 11,
      drawn: 3,
      lost: 1,
      goalsFor: 32,
      goalsAgainst: 12,
      goalDifference: 20,
      points: 36,
      form: ["W", "W", "D", "W", "W"],
    },
    {
      position: 2,
      name: "Flamengo",
      played: 15,
      won: 10,
      drawn: 4,
      lost: 1,
      goalsFor: 30,
      goalsAgainst: 14,
      goalDifference: 16,
      points: 34,
      form: ["W", "W", "W", "D", "W"],
    },
    {
      position: 3,
      name: "Atlético-MG",
      played: 15,
      won: 9,
      drawn: 5,
      lost: 1,
      goalsFor: 27,
      goalsAgainst: 13,
      goalDifference: 14,
      points: 32,
      form: ["D", "W", "W", "D", "W"],
    },
    {
      position: 4,
      name: "Internacional",
      played: 15,
      won: 9,
      drawn: 3,
      lost: 3,
      goalsFor: 25,
      goalsAgainst: 15,
      goalDifference: 10,
      points: 30,
      form: ["L", "W", "W", "W", "D"],
    },
    {
      position: 5,
      name: "São Paulo",
      played: 15,
      won: 8,
      drawn: 5,
      lost: 2,
      goalsFor: 24,
      goalsAgainst: 16,
      goalDifference: 8,
      points: 29,
      form: ["W", "D", "W", "D", "D"],
    },
    {
      position: 6,
      name: "Corinthians",
      played: 15,
      won: 7,
      drawn: 6,
      lost: 2,
      goalsFor: 22,
      goalsAgainst: 15,
      goalDifference: 7,
      points: 27,
      form: ["D", "W", "D", "D", "W"],
    },
    {
      position: 7,
      name: "Grêmio",
      played: 15,
      won: 7,
      drawn: 4,
      lost: 4,
      goalsFor: 21,
      goalsAgainst: 18,
      goalDifference: 3,
      points: 25,
      form: ["L", "W", "D", "W", "L"],
    },
    {
      position: 8,
      name: "Fluminense",
      played: 15,
      won: 6,
      drawn: 6,
      lost: 3,
      goalsFor: 20,
      goalsAgainst: 17,
      goalDifference: 3,
      points: 24,
      form: ["D", "D", "W", "L", "D"],
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Classificação - Brasileirão</h2>
        <p className="text-muted-foreground">Temporada 2026</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-center">J</TableHead>
                <TableHead className="text-center">V</TableHead>
                <TableHead className="text-center">E</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">GP</TableHead>
                <TableHead className="text-center">GC</TableHead>
                <TableHead className="text-center">SG</TableHead>
                <TableHead className="text-center font-semibold">PTS</TableHead>
                <TableHead className="text-center">Forma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.position} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1 h-8 rounded-full ${
                          team.position <= 4
                            ? "bg-green-500"
                            : team.position <= 6
                            ? "bg-blue-500"
                            : team.position <= 12
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="font-semibold">{team.position}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {team.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold">{team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.drawn}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-lg">
                    {team.points}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-center">
                      {team.form.map((result, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                            result === "W"
                              ? "bg-green-600"
                              : result === "D"
                              ? "bg-gray-500"
                              : "bg-red-600"
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-muted-foreground">Libertadores</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-muted-foreground">Pré-Libertadores</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-muted-foreground">Sul-Americana</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-muted-foreground">Rebaixamento</span>
        </div>
      </div>
    </div>
  );
}

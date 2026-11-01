# Braindump

Eine Mod für Claude Code, die lange, diktierte Gedankenströme per Knopfdruck in einen knappen, klaren Prompt verwandelt.

*English in short: Braindump adds a bar above the prompt box. When you dictate a long, rambling message, one click rewrites it into a concise, ready-to-send prompt, using only the cheapest and fastest model (Haiku).*

## Wofür

Wer per Sprache diktiert, redet meist ungeordnet: mit Füllwörtern, Wiederholungen, Selbstkorrekturen und Wörtern, die die Spracherkennung falsch versteht. Braindump räumt das auf, bevor die Nachricht abgeschickt wird.

**Vorher (diktiert):**
> Also ähm, schreib mir für den Newsletter zum Klaut-Update einen Text, also eher kurz, nee, warte, eher ausführlich mit Zwischenüberschriften, und ähm am Anfang so zwei Sätze, worum's geht, und keine Emojis.

**Nachher (ein Klick):**
> Schreib einen Newsletter-Text zum Claude-Update:
> • ausführlich, mit Zwischenüberschriften
> • Einstieg: zwei Sätze, worum es geht
> • keine Emojis

## So funktioniert es

Über dem Eingabefeld erscheint eine schmale Leiste, sobald Text im Feld steht:

| Zustand | Was die Leiste zeigt |
| --- | --- |
| Kurzer Text | „Liest mit …" |
| Ab 2 Sätzen | „Langes Diktat erkannt" und der Knopf **Strukturieren** |
| Nach dem Klick | „Prompt strukturiert" und der Knopf **Original** |
| Bei einem Fehler | „Strukturieren fehlgeschlagen" und der Knopf **Nochmal** |

Das **–** rechts klappt die Leiste zusammen, ein **+** holt sie zurück.

Ein Klick auf **Strukturieren** ersetzt den Text im Eingabefeld durch die aufgeräumte Fassung. Du liest sie kurz durch und schickst sie selbst ab. **Original** holt deinen Rohtext jederzeit zurück. Es wird nichts automatisch gesendet.

### Was dabei passiert

- Füllwörter, Wiederholungen und Abschweifungen fallen weg.
- Selbstkorrekturen werden aufgelöst: Es gilt die letzte Aussage.
- Offensichtliche Spracherkennungsfehler werden aus dem Zusammenhang korrigiert.
- Es wird nichts erfunden oder ergänzt, und die Aufgabe wird nicht selbst ausgeführt.
- Namen, Zahlen, Links und Zeitangaben bleiben unverändert.
- Unentschiedenes oder Offenes steht am Ende in einer Zeile „Offen: …".

### Nur Haiku

Für die Umformulierung wird ausschließlich das Modell **Haiku** verwendet, das günstigste und schnellste. Der Aufruf läuft mit niedrigem Denkaufwand und einer Zeitgrenze von 30 Sekunden.

## Installation

In einer Claude-Code-Sitzung im Terminal:

```
/plugin install braindump --marketplace imperf4-design/Braindump-Mod
```

Bestätige mit `y`, um den Marketplace hinzuzufügen, und wähle danach einen Bereich (Scope). Die Mod ist danach sofort aktiv.

## Einstellungen

Zu finden im `/config`-Menü, im Bereich der Mod:

- **Ab wie vielen Sätzen** (Standard: 2): ab dieser Satzzahl wird das Strukturieren angeboten. Fehlt im Diktat die Zeichensetzung, greift ersatzweise eine Länge von etwa zwölf Wörtern pro Satz.
- **Wörterliste**: Eigennamen und Begriffe, durch Komma getrennt, zum Beispiel `Claude, Figma, Notion`. Sie werden immer so geschrieben, auch wenn die Spracherkennung sie verhört.

## Hinweise

- Die Oberfläche der Mod ist auf Deutsch. Der Text im Eingabefeld wird in der Sprache des Originals umformuliert.
- Zum Umformulieren wird dein Text an das Modell gesendet, wie bei jeder anderen Nachricht an Claude.

## Lizenz

MIT, siehe [LICENSE](LICENSE).

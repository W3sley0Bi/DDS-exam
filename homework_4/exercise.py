import socket
import http.cookies

#set cookies...
c = http.cookies.SimpleCookie()
c["my_cookie"] = "100"
c["my_cookie"]["path"] = "/"
c["my_cookie"]["max-age"] = 3600

def create_error_page(conn, err_string):
    conn.send('HTTP/1.1 400 Bad Request\r\n'.encode())
    conn.send('Connection: close\r\n'.encode())
    conn.send('Content-Type: text/html\r\n\r\n'.encode())
    conn.send('<html><head><title>ERROR</title></head>\r\n'.encode())
    conn.send(f'<body><h1>Error</h1><hr/><p>{err_string}</p></body></html>'.encode())
    conn.close()


def handle_request(conn):
    data = conn.recv(1024)
    parts = data.decode().split('\r\n\r\n')
    head = parts[0]
    body = ''
    if len(parts) > 1:
        body = parts[1]

    header = {}
    values = {}

    lines = head.split('\r\n')

    if lines[0].split(' ')[1] != '/':
        create_error_page(conn, "Resource not available")
        return

    for line in lines[1:]:
        key, value = line.split(': ')
        header[key] = value

    if body:
        pairs = body.split('&')
        for pair in pairs:
            key, value = pair.split('=')
            values[key] = value

    try:
        # get  cookie
        
        b = c.get("my_cookie")
        balance = float(b.value)
        
        cookie_string = c.output()
       # print(cookie_string)
      #  http.cookies.response.headers["Set-Cookie"] = cookie_string

    except:
        balance = 100 #this thing is not working

    amount = 0
    if 'amount' in values:
        try:
            amount = float(values['amount'])
        except:
            create_error_page(conn, f"{values['amount']} is not a float")
            return
        
        balance -= amount

        try:
           #update the cookie value 
            c["my_cookie"] = f"{balance:5.2f}"
            
            print(balance)

            conn.send('HTTP/1.1 303 See Other\r\n'.encode())
            conn.send('Location: /\r\n\r\n'.encode())
            conn.close()
            return
            # ------------------

        except:
            create_error_page(conn, "There is a problem with the account file")
            return

    conn.send('HTTP/1.1 200 OK\r\n'.encode())
    conn.send('Connection: close\r\n'.encode())
    conn.send('Content-Type: text/html\r\n'.encode())
    conn.send(f'{cookie_string}\r\n\r\n'.encode())
    
    conn.send('<html><head><title>Account</title></head>\r\n'.encode())
    conn.send('<body><h1>Account</h1><hr/>\r\n'.encode())
    if 'amount' in values:
        conn.send(f'<p>Transfer = {amount:5.2f}</p>\r\n'.encode())
    conn.send(f'<p>New balance = {balance:5.2f}</p>\r\n'.encode())
    conn.send('<form method="POST" action="/" enctype="application/x-www-form-urlencoded">\r\n'.encode())
    conn.send('<p>Amount to transfer: <input type="text" name="amount"/></p>\r\n'.encode())
    conn.send('<p><input type="submit" value="Transfer"/></p>\r\n'.encode())
    conn.send('</form>\r\n'.encode())
    conn.send('</body></html>\r\n'.encode())
    conn.close()
    return


if __name__ == '__main__':
  #  ACCOUNTFILE = 'account.txt'

    TCP_IP = ''
    TCP_PORT = 3000

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((TCP_IP, TCP_PORT))
    s.listen(1)

    while 1:
        conn, address = s.accept()
        handle_request(conn)



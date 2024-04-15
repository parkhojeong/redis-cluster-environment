#### 공식문서(https://redis.io/docs/management/scaling/#create-and-use-a-redis-cluster) 를 기반으로 레디스 클러스터를 띄워보는 방법


7001 부터 7006 까지 각 폴더에 들어가서 노드를 띄운다
```bash
redis-server ./redis.conf
```

위에 띄어놓은 노드를 기준으로 클러스터를 생성한다. replicas 1은 각각의 마스터에 하나의 슬레이브 노드를 둔다는 뜻임.
```bash
redis-cli --cluster create 127.0.0.1:7001 \
127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 \
--cluster-replicas 1
```

redis-cli를 통해 구동확인
```
redis-cli -h 127.0.0.1 -p 7001 PING
```

redist-cli를 통해 접속 
```bash
redis-cli -c -p 7001
# 127.0.0.1:7001>
```

get, set 명령어가 잘 동작하는지 확인
```bash
127.0.0.1:7001> set hello world
# -> Redirected to slot [866] located at 127.0.0.1:7006
# OK
127.0.0.1:7006> get hello
# "world"
```

node 구성 확인
```bash
127.0.0.1:7006> CLUSTER SLOTS
1) 1) (integer) 0
   2) (integer) 5460
   3) 1) "127.0.0.1"
      2) (integer) 7006
      3) "09d92184f0283f7f9affaf87becf8a89795d9bc4"
      4) (empty array)
   4) 1) "127.0.0.1"
      2) (integer) 7004
      3) "d3feccc6acf8c28db630e39b0ff983b5ce1fb68e"
      4) (empty array)
2) 1) (integer) 5461
   2) (integer) 10922
   3) 1) "127.0.0.1"
      2) (integer) 7001
      3) "e01a7c4ae8903c20e1a00d4965c51e7b64ae0c27"
      4) (empty array)
   4) 1) "127.0.0.1"
      2) (integer) 7005
      3) "0f5a55801d8aacca55545a2103d5a58da2d776d7"
      4) (empty array)
3) 1) (integer) 10923
   2) (integer) 16383
   3) 1) "127.0.0.1"
      2) (integer) 7002
      3) "6ac6eba961cc7c74674220693154ec31f5fa404c"
      4) (empty array)
   4) 1) "127.0.0.1"
      2) (integer) 7003
      3) "2f4641d656d191d78a033447c3062602436fe63c"
      4) (empty array)

```

ioredis
```ts
import Redis from "ioredis";
const cluster = new Redis.Cluster([
    {
      port: 7001,// get, set을 호출했을 때 다른 노드로 redirection이 필요한 경우 레디스 클러스터가 리다이렉션 응답을 해주기 때문에 하나의 노드만 넣어도 동작함
      host: "127.0.0.1" 
    }
  ]);

await cluster.get("c", "123");
await cluster.set("c", "123");
```

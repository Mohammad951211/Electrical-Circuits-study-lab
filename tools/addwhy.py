"""Convert 'idx|text' lines (from stdin file) into src/why/<ch>.txt lines 'idx|prefix|text' using the MCQ dump.
Usage: python3 tools/addwhy.py CH file   (needs /tmp/mcq.json from the dump script)"""
import json,sys
ch,f=sys.argv[1],sys.argv[2]
kind=sys.argv[3] if len(sys.argv)>3 else 'mcq'
mcq=json.load(open('/tmp/mcq.json' if kind=='mcq' else '/tmp/bank.json'))[ch]
QI=1
out=[];seen=set()
for ln in open(f,encoding='utf-8'):
    ln=ln.rstrip('\n')
    if not ln.strip(): continue
    i,t=ln.split('|',1); i=int(i); seen.add(i)
    pre=mcq[i][1][:30].split('|')[0]
    out.append(f"{i}|{pre}|{t}")
miss=[i for i in range(len(mcq)) if i not in seen]
print('chapter',ch,'written',len(seen),'of',len(mcq),'missing',miss)
open(f'src/why/{ch}.txt' if kind=='mcq' else f'src/why/b{ch}.txt','w',encoding='utf-8').write('\n'.join(out)+'\n')
